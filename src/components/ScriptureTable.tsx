import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  IState,
  PassageSection,
  Section,
  Passage,
  IPlanSheetStrings,
  IScriptureTableStrings,
  BookNameMap,
  BookName,
} from '../model';
import { OptionType } from '../components/ReactSelect';
import localStrings from '../selector/localize';
import * as actions from '../actions';
import { withData, WithDataProps } from 'react-orbitjs';
import { TransformBuilder, RecordIdentity } from '@orbit/data';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SnackBar from './SnackBar';
import PlanSheet from './PlanSheet';
import Related from '../utils/related';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
    },
    paper: {},
    actions: theme.mixins.gutters({
      paddingBottom: 16,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }),
    button: {
      margin: theme.spacing(1),
    },
    icon: {
      marginLeft: theme.spacing(1),
    },
  })
);

interface ISequencedRecordIdentity extends RecordIdentity {
  sequencenum: number;
}

interface IStateProps {
  t: IScriptureTableStrings;
  s: IPlanSheetStrings;
  lang: string;
  bookSuggestions: OptionType[];
  bookMap: BookNameMap;
  allBookData: BookName[];
}

interface IDispatchProps {
  fetchBooks: typeof actions.fetchBooks;
}

interface IProps extends IStateProps, IDispatchProps, WithDataProps {
  setChanged?: (v: boolean) => void;
}

export function ScriptureTable(props: IProps) {
  const {
    t,
    s,
    lang,
    bookSuggestions,
    bookMap,
    allBookData,
    fetchBooks,
    updateStore,
    queryStore,
    setChanged,
  } = props;
  const classes = useStyles();
  const [plan] = useGlobal('plan');
  const [project] = useGlobal('project');
  const [dataStore] = useGlobal('dataStore');
  const [schema] = useGlobal('schema');
  const [message, setMessage] = useState(<></>);
  const [sectionId, setSectionId] = useState(Array<RecordIdentity>());
  const [passageId, setPassageId] = useState(Array<ISequencedRecordIdentity>());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columns, setColumns] = useState([
    { value: t.section, readOnly: true, width: 80 },
    { value: t.title, readOnly: true, width: 280 },
    { value: t.passage, readOnly: true, width: 80 },
    { value: t.book, readOnly: true, width: 170 },
    { value: t.reference, readOnly: true, width: 180 },
    { value: t.description, readOnly: true, width: 280 },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(
    Array<Array<any>>()
    // [[1,"Luke wrote this book about Jesus for Theophilus",'','LUK',"Section 1:1–4",''],
    // ['','',1,'LUK',"1:1-4",''],
    // [2,"An angel said that John the Baptizer would be born",'','LUK',"Section 1:5–25",''],
    // ['','',1,'LUK',"1:5-7",''],
    // ['','',2,'LUK',"1:8-10",''],
    // ['','',3,'LUK',"1:11-17",''],
    // ['','',4,'LUK',"1:18-20",''],
    // ['','',5,'LUK',"1:21-25",''],
    // [3,"An angel told Mary that Jesus would be born",'','LUK',"Section 1:26–38",''],
    // ['','',1,'LUK',"1:26-28",''],
    // ['','',2,'LUK',"1:29-34",''],
    // ['','',3,'LUK',"1:35-38",''],
    // [4,"Mary visited Elizabeth",'','LUK',"Section 1:39–45",''],
    // ['','',1,'LUK',"1:39-45",''],
    // [5,"Mary praised God",'','LUK',"Section 1:46–56",''],
    // ['','',1,'LUK',"1:46-56",''],
    // [6,"John the Baptizer was born and received his name",'','LUK',"Section 1:57–66",''],
    // ['','',1,'LUK',"1:57-58",''],
    // ['','',2,'LUK',"1:59-64",''],
    // ['','',3,'LUK',"1:65-66",''],
    // [7,"Zechariah prophesied and praised God",'','LUK',"Section 1:67–80",''],
    // ['','',1,'LUK',"1:67-80",''],]
  );
  const [inData, setInData] = useState(Array<Array<any>>());

  const BookCol = 3;

  const handleMessageReset = () => {
    setMessage(<></>);
  };
  const addSection = () => {
    const sequenceNums = data.map(row => row[0] || 0) as number[];
    const sequencenum = Math.max(...sequenceNums, 0) + 1;
    setData([...data.concat([[sequencenum, '', '', '', '', '']])]);
  };
  const addPassage = () => {
    const lastRow = data.length - 1;
    const sequencenum = (data[lastRow][2] || 0) + 1;
    const book = data[lastRow][BookCol] || '';
    setData([...data.concat([['', '', sequencenum, book, '', '']])]);
  };
  const handleAction = (what: string, where: number[]) => {
    if (what === 'Delete') {
      const deleteRow = async (id: RecordIdentity) => {
        await updateStore(t => t.removeRecord(id));
      };
      for (
        let rowListIndex = 0;
        rowListIndex < where.length;
        rowListIndex += 1
      ) {
        const rowIndex = where[rowListIndex];
        if (sectionId[rowIndex] && sectionId[rowIndex].id) {
          deleteRow(sectionId[rowIndex]);
        }
        if (passageId[rowIndex] && passageId[rowIndex].id) {
          deleteRow(passageId[rowIndex]);
        }
      }
      setData(data.filter((row, rowIndex) => !where.includes(rowIndex)));
      return true;
    }
    setMessage(<span>{what}...</span>);
    return false;
  };
  const validTable = (rows: string[][]) => {
    if (rows.length === 0) return false;
    if (rows[0].length !== 6) return false;
    if (
      rows.filter((row, rowIndex) => rowIndex > 0 && !/^[0-9]*$/.test(row[0]))
        .length > 0
    )
      return false;
    if (
      rows.filter((row, rowIndex) => rowIndex > 0 && !/^[0-9]*$/.test(row[2]))
        .length > 0
    )
      return false;
    return true;
  };
  const lookupBook = (userBookDes: string): string => {
    const userBookDesUc = userBookDes.toLocaleUpperCase();
    if (userBookDesUc !== '' && !bookMap[userBookDesUc]) {
      const proposed = allBookData.filter(
        bookName =>
          bookName.short.toLocaleUpperCase() === userBookDesUc ||
          bookName.long.toLocaleUpperCase() === userBookDesUc ||
          bookName.abbr.toLocaleUpperCase() === userBookDesUc
      );
      if (proposed.length >= 1) return proposed[0].code;
    }
    return userBookDesUc;
  };
  const handlePaste = (rows: string[][]) => {
    if (setChanged) setChanged(true);
    if (validTable(rows)) {
      const startRow = /^[0-9]*$/.test(rows[0][0]) ? 0 : 1;
      setData([
        ...data.concat(
          rows
            .filter((row, rowIndex) => rowIndex >= startRow)
            .map(row =>
              row.map((col, colIndex) =>
                colIndex !== BookCol ? col : lookupBook(col)
              )
            )
        ),
      ]);
      return Array<Array<string>>();
    }
    return rows;
  };
  const updateData = (rows: string[][]) => {
    setData(rows);
  };
  const handleSave = (rows: string[][]) => {
    const addPassage = async (rowIndex: number, secId: string) => {
      const passageRow = rows[rowIndex];
      const p = {
        type: 'passage',
        attributes: {
          sequencenum: passageRow[2],
          book: passageRow[BookCol],
          reference: passageRow[4],
          title: passageRow[5],
          position: 0,
          hold: false,
          state: 'Not assigned',
        },
      } as any;
      schema.initializeRecord(p);
      const passageSection = {
        type: 'passagesection',
        attributes: {
          sectionId: 0,
          passageId: 0,
        },
      } as any;
      await dataStore.update((t: TransformBuilder) => [
        t.addRecord(p),
        t.addRecord(passageSection),
        t.replaceRelatedRecord(
          { type: 'passagesection', id: passageSection.id },
          'section',
          { type: 'section', id: secId }
        ),
        t.replaceRelatedRecord(
          { type: 'passagesection', id: passageSection.id },
          'passage',
          { type: 'passage', id: p.id }
        ),
      ]);
    };
    const changePassage = async (rowIndex: number) => {
      const passageRow = rows[rowIndex];
      const inpRow = inData[rowIndex];
      if (
        passageRow[2] !== inpRow[2] ||
        passageRow[3] !== inpRow[3] ||
        passageRow[4] !== inpRow[4] ||
        passageRow[5] !== inpRow[5]
      ) {
        let passage = (await queryStore(q =>
          q.findRecord(passageId[rowIndex])
        )) as Passage;
        passage.attributes.sequencenum = parseInt(passageRow[2]);
        passage.attributes.book = passageRow[BookCol];
        passage.attributes.reference = passageRow[4];
        passage.attributes.title = passageRow[5];
        delete passage.relationships;
        await updateStore(t => t.replaceRecord(passage));
      }
    };
    const doPassages = (rowIndex: number, secId: string) => {
      do {
        const passageRow = rows[rowIndex];
        if (/^[0-9]+$/.test(passageRow[2])) {
          if (!passageId[rowIndex]) {
            addPassage(rowIndex, secId);
          } else {
            changePassage(rowIndex);
          }
        }
        rowIndex += 1;
      } while (rowIndex < rows.length && rows[rowIndex][0] === '');
    };
    const addSection = async (
      rowIndex: number,
      planId: string,
      projectId: string
    ) => {
      const sectionRow = rows[rowIndex];
      const sec = {
        type: 'section',
        attributes: {
          sequencenum: parseInt(sectionRow[0]),
          name: sectionRow[1],
        },
      } as any;
      schema.initializeRecord(sec);
      await dataStore.update((t: TransformBuilder) => [
        t.addRecord(sec),
        t.replaceRelatedRecord({ type: 'section', id: sec.id }, 'plan', {
          type: 'plan',
          id: planId,
        }),
      ]);
      return sec;
    };
    const changeSection = async (rowIndex: number) => {
      const sectionRow = rows[rowIndex];
      const inpRow = inData[rowIndex];
      if (sectionRow[0] !== inpRow[0] || sectionRow[1] !== inpRow[1]) {
        let section = (await queryStore(q =>
          q.findRecord(sectionId[rowIndex])
        )) as Section;
        section.attributes.sequencenum = parseInt(sectionRow[0]);
        section.attributes.name = sectionRow[1];
        delete section.relationships;
        await updateStore(t => t.replaceRecord(section));
      }
      return sectionId[rowIndex];
    };
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      if (/^[0-9]+$/.test(rows[rowIndex][0])) {
        if (!sectionId[rowIndex] || !sectionId[rowIndex].id) {
          addSection(rowIndex, plan as string, project as string).then(sec =>
            doPassages(rowIndex, sec.id)
          );
        } else {
          changeSection(rowIndex).then(sec => doPassages(rowIndex, sec.id));
        }
      }
    }
    if (setChanged) setChanged(false);
  };

  useEffect(() => {
    fetchBooks(lang);
    let initData = Array<Array<any>>();
    let sectionIds = Array<RecordIdentity>();
    let passageIds = Array<ISequencedRecordIdentity>();
    const getPassage = async (
      pId: string,
      list: (string | number)[][],
      ids: Array<ISequencedRecordIdentity>
    ) => {
      let passage = (await queryStore(q =>
        q.findRecord({ type: 'passage', id: pId })
      )) as Passage;
      if (passage != null) {
        if (!passage.attributes) return;
        list.push([
          '',
          '',
          passage.attributes.sequencenum,
          passage.attributes.book,
          passage.attributes.reference,
          passage.attributes.title,
        ]);
        ids.push({
          type: 'passage',
          id: passage.id,
          sequencenum: passage.attributes.sequencenum,
        });
      }
    };
    const getPassageSection = async (sec: Section) => {
      let passageSections = (await queryStore(q =>
        q.findRecords('passagesection')
      )) as Array<PassageSection>;
      // query filter doesn't work with JsonApi since id not translated
      passageSections = passageSections.filter(
        ps => Related(ps, 'section') === sec.id
      );
      if (passageSections != null) {
        let passages = Array<Array<string | number>>();
        let ids = Array<ISequencedRecordIdentity>();
        for (
          let psgIndex = 0;
          psgIndex < passageSections.length;
          psgIndex += 1
        ) {
          let ps = passageSections[psgIndex] as PassageSection;
          await getPassage(Related(ps, 'passage'), passages, ids);
        }
        passages = passages.sort((i, j) => {
          return parseInt(i[2].toString()) - parseInt(j[2].toString());
        });
        ids = ids.sort((i, j) => {
          return i.sequencenum - j.sequencenum;
        });
        for (let psgIndex = 0; psgIndex < passages.length; psgIndex += 1) {
          while (passageIds.length < initData.length) {
            passageIds.push({ type: '', id: '', sequencenum: 0 });
          }
          passageIds[initData.length] = ids[psgIndex];
          initData.push(passages[psgIndex]);
        }
      }
    };
    const getSections = async (p: string) => {
      let sections = (await queryStore(q =>
        q.findRelatedRecords({ type: 'plan', id: p }, 'sections')
      )) as Array<Section>;
      // query filter doesn't work with JsonApi since id not translated
      // q.findRecords('section')
      //   .filter({relation: 'plan', record: {type: 'plan', id: p}})
      //   .sort('sequencenum'));
      sections = sections
        .filter(s => s.attributes)
        .sort((i, j) => i.attributes.sequencenum - j.attributes.sequencenum);
      if (sections != null) {
        for (let secIndex = 0; secIndex < sections.length; secIndex += 1) {
          let sec = sections[secIndex] as Section;
          if (!sec.attributes) continue;
          while (sectionIds.length < initData.length) {
            sectionIds.push({ type: '', id: '' });
          }
          sectionIds[initData.length] = { type: 'section', id: sec.id };
          initData.push([
            sec.attributes.sequencenum,
            sec.attributes.name,
            '',
            '',
            '',
            '',
          ]);
          await getPassageSection(sec);
        }
      }
    };
    getSections(plan as string).then(() => {
      setData(initData);
      setInData(initData);
      setSectionId(sectionIds);
      setPassageId(passageIds);
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [plan]);

  return (
    <div className={classes.container}>
      <PlanSheet
        columns={columns}
        rowData={data as any[][]}
        bookCol={BookCol}
        bookMap={bookMap}
        bookSuggestions={bookSuggestions}
        save={handleSave}
        action={handleAction}
        addSection={addSection}
        addPassage={addPassage}
        updateData={updateData}
        paste={handlePaste}
        lookupBook={lookupBook}
        setChanged={setChanged}
        t={s}
      />
      <SnackBar {...props} message={message} reset={handleMessageReset} />
    </div>
  );
}

const mapStateToProps = (state: IState): IStateProps => ({
  t: localStrings(state, { layout: 'scriptureTable' }),
  s: localStrings(state, { layout: 'planSheet' }),
  lang: state.strings.lang,
  bookSuggestions: state.books.suggestions,
  bookMap: state.books.map,
  allBookData: state.books.bookData,
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  ...bindActionCreators(
    {
      fetchBooks: actions.fetchBooks,
    },
    dispatch
  ),
});

const mapRecordsToProps = {};

export default withData(mapRecordsToProps)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptureTable) as any) as any;
