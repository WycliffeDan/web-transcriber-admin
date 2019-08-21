import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Auth from '../auth/Auth';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IState, IMainStrings } from '../model';
import localStrings from '../selector/localize';
import { API_CONFIG } from '../api-variable';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Paper,
  LinearProgress,
} from '@material-ui/core';
import * as action from '../store';
import logo from './transcriber9.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      width: '100%',
    },
    paper: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing(10),
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    }),
    button: {},
    icon: {
      alignSelf: 'center',
      width: '256px',
      height: '256px',
    },
    message: {
      alignSelf: 'center',
    },
  })
);

interface IStateProps {
  t: IMainStrings;
  orbitLoaded: boolean;
}

interface IDispatchProps {
  fetchLocalization: typeof action.fetchLocalization;
  fetchLangTags: typeof action.fetchLangTags;
  setLanguage: typeof action.setLanguage;
  fetchOrbitData: typeof action.fetchOrbitData;
  fetchScriptFonts: typeof action.fetchScriptFonts;
}

interface IProps extends IStateProps, IDispatchProps {
  auth: Auth;
}

export function Loading(props: IProps) {
  const { orbitLoaded, auth, t } = props;
  const classes = useStyles();
  const {
    fetchOrbitData,
    fetchLocalization,
    fetchLangTags,
    fetchScriptFonts,
    setLanguage,
  } = props;
  const { isAuthenticated } = auth;
  const [memory] = useGlobal('memory');
  const [schema] = useGlobal('schema');
  const [keyMap] = useGlobal('keyMap');
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [_user, setUser] = useGlobal('user');
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setLanguage(navigator.language.split('-')[0]);
    fetchLocalization();
    fetchLangTags();
    fetchScriptFonts();
    fetchOrbitData(schema, memory, keyMap, auth, setUser, setCompleted);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  if (!isAuthenticated()) return <Redirect to="/" />;

  if (orbitLoaded && (completed === 100 || API_CONFIG.offline)) {
    return <Redirect to="/main" />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {t.silTranscriberAdmin}
          </Typography>
          <div className={classes.grow}>{'\u00A0'}</div>
          <Link to="/logout">
            <Button variant="contained" className={classes.button}>
              {t.logout}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <img src={logo} className={classes.icon} alt="logo" />
          <Typography variant="h6" className={classes.message}>
            {t.loadingTranscriber}
          </Typography>
          <LinearProgress variant="determinate" value={completed} />
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState): IStateProps => ({
  t: localStrings(state, { layout: 'main' }),
  orbitLoaded: state.orbit.loaded,
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  ...bindActionCreators(
    {
      fetchLocalization: action.fetchLocalization,
      setLanguage: action.setLanguage,
      fetchOrbitData: action.fetchOrbitData,
      fetchLangTags: action.fetchLangTags,
      fetchScriptFonts: action.fetchScriptFonts,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading) as any;
