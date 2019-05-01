import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState, Project, IProjectTableStrings } from '../model';
import localStrings from '../selector/localize';
import { withData } from 'react-orbitjs';
import { QueryBuilder, Record, TransformBuilder } from '@orbit/data';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { IntegratedSorting, SortingState } from '@devexpress/dx-react-grid';
import { Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  Toolbar } from '@devexpress/dx-react-grid-material-ui';
import TranscriberBar from '../components/TranscriberBar';
import Confirm from '../components/AlertDialog';
import Auth from '../auth/Auth';

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  }),
  grow: {
    flexGrow: 1,
  },
  dialogHeader: theme.mixins.gutters({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }),
  editIcon: {
    fontSize: 16,
  },
  link: {},
  deleteIcon: {},
  button: {},
  icon: {},
});

interface Row {
  type: string;
  id: number;
  name: string;
  description: string;
  language: string;
  delete: string;
}

interface IProps extends IStateProps, WithStyles<typeof styles>{
  projects: any;
  updateStore: any;
  auth: Auth;
};

export function ProjectTable(props: IProps) {
  const { classes, projects, updateStore, auth, t } = props;
  const { isAuthenticated } = auth;
  const [columns, setColumns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'description', title: 'Description' },
    { name: 'language', title: 'Language' },
    { name: 'delete', title: 'Delete' },
  ]);
  const [rows, setRows] = useState(Array<Row>());
  const [view, setView] = useState('');
  const [deleteItem, setDeleteItem] = useState('');
  const [project, setProject] = useGlobal('project');

  const handleDelete = (e: any) => { setDeleteItem(e.currentTarget.id) };
  const handleDeleteConfirmed = () => {
    updateStore((t: TransformBuilder) => t.removeRecord({
      type: 'project',
      id: deleteItem,
    }))
  };
  const handleDeleteRefused = () => { setDeleteItem('') };
  const handleAdd = () => {
    setProject(null);
    setView('/projectstatus?add')
  };
  const handleCancel = () => { setView('/admin') };
  const handleEdit = (e:any) => {
    setProject(projects.filter((p: Project) => p.attributes.name.toLowerCase() === e.target.innerText.toLowerCase())[0].id);
    setView('/projectstatus')
  };

  useEffect(() => {
    setColumns([
      { name: 'name', title: t.name },
      { name: 'description', title: t.description },
      { name: 'language', title: t.language },
      { name: 'delete', title: t.delete },
    ])
    setRows(projects.map((o: Project) => ({
      type: o.type,
      id: o.id,
      name: o.attributes.name,
      description: o.attributes.description,
      language: o.attributes.language,
      delete: o.id,
    })))
  }, [projects, t.name, t.description, t.language, t.delete]);

  if (!isAuthenticated()) return <Redirect to='/' />;

  const LinkCell = ({ value, style, ...restProps }: {value: string, style: object, row: any, column: any, tableRow: any, tableColumn: any}) => (
    <Table.Cell {...restProps} style={{...style}} value >
      <Button
        key={value}
        aria-label={value}
        color="primary"
        className={classes.link}
        onClick={handleEdit}
      >
        {value}
        <EditIcon className={classes.editIcon} />
      </Button>
    </Table.Cell>
  );

  const DeleteCell = ({ value, style, ...restProps }: {value: string, style: object, row: any, column: any, tableRow: any, tableColumn: any}) => (
    <Table.Cell {...restProps} style={{...style}} value >
      <IconButton
        id={value}
        key={value}
        aria-label={value}
        color="default"
        className={classes.deleteIcon}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Table.Cell>
  );

  const Cell = (props: any) => {
    const { column } = props;
    if (column.name === 'name') {
      return <LinkCell {...props} />
    } else if (column.name === 'delete') {
      return <DeleteCell {...props} />
    }
    return <Table.Cell {...props} />
  };

  if (view !== '') return <Redirect to={view} />;

  return (
    <div className={classes.root}>
      <TranscriberBar {...props} close={handleCancel}/>
      <div className={classes.container}>
        <Paper id="ProjectTable" className={classes.paper}>
        <div className={classes.dialogHeader}>
        <div className={classes.grow} />
        <h2>{t.chooseProject}</h2>
        <div className={classes.grow} />
          <Fab
            key="add"
            aria-label="Add"
            color="primary"
            className={classes.button}
            onClick={handleAdd}
          >
            <AddIcon className={classes.icon} />
          </Fab>
        </div>
        <Grid rows={rows} columns={columns}>
          <SortingState
            defaultSorting={[{ columnName: "name", direction: "asc" }]}
          />
            <IntegratedSorting />
            <Table cellComponent={Cell} />
              <TableColumnResizing
                minColumnWidth={50}
                defaultColumnWidths={[
                  { columnName: "name", width: 200 },
                  { columnName: "description", width: 400 },
                  { columnName: "language", width: 100 },
                  { columnName: "delete", width: 100 }
                ]}
              />
            <TableHeaderRow showSortingControls={true} />
            <Toolbar />
          </Grid>
        </Paper>
      </div>
      {deleteItem !== ''
        ? <Confirm
            yesResponse={handleDeleteConfirmed}
            noResponse={handleDeleteRefused}
          />
        : <></>}
    </div>
  );
};

interface IStateProps {
  t: IProjectTableStrings;
}
const mapStateToProps = (state: IState): IStateProps => ({
  t: localStrings(state, {layout: "projectTable"})
});

interface IRecordProps {
    projects: () => Array<Record>;
}

const mapRecordsToProps = {
    projects: (q: QueryBuilder) => q.findRecords('project'),
}

export default withStyles(styles, { withTheme: true })(
    withData(mapRecordsToProps)(
        connect(mapStateToProps)(ProjectTable) as any
        ) as any
    ) as any;
