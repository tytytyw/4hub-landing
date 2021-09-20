import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styles from './BusinessCabinet.module.sass'

import {Switch, Route, useHistory, Redirect} from 'react-router'
import {menu} from "./listHelper";
import {setPreviewTheme} from "../../../../Store/actions/main";
import SideMenu from "../SideMenu";
import Company from "./Company";
import BottomPanel from "../BottomPanel";

const BusinessCabinet = () => {

    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false)

    const history = useHistory()

    history.listen(() => {
        const route = history?.location.pathname
        if (route !== 'settings') {
            dispatch(setPreviewTheme(null))
        }
    })

    useEffect(() => {

        let date = new Date();
        date.setHours(date.getHours() + 1);
        document.cookie = `uid=${uid};expires=${date}`;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.mainWrap}>

            <SideMenu
                data={menu}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div className={styles.workArea}>

                <Switch>
                    <Route path='/company' component={Company}/>
                    <Redirect to='/company'/>
                </Switch>

            </div>

            <BottomPanel/>

        </div>
    )
}

export default BusinessCabinet;
