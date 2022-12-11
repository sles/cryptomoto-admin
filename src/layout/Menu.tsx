import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import LabelIcon from '@mui/icons-material/Label';

import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    useSidebarState,
} from 'react-admin';

import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import categories from '../categories';
import blockedUsers from "../blocked-users"
import customArticles from "../custom-articles"
import reports from "../reports"
import privateChats from "../private-chats"
import SubMenu from './SubMenu';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuCustomers: true,
    });
    const translate = useTranslate();
    const [open] = useSidebarState();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop: 1,
                marginBottom: 1,
                transition: theme =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            {/*<SubMenu*/}
            {/*    handleToggle={() => handleToggle('menuCatalog')}*/}
            {/*    isOpen={state.menuCatalog}*/}
            {/*    name="pos.menu.catalog"*/}
            {/*    icon={<products.icon />}*/}
            {/*    dense={dense}*/}
            {/*>*/}
                {/*<MenuItemLink*/}
                {/*    to="/products"*/}
                {/*    state={{ _scrollToTop: true }}*/}
                {/*    primaryText={translate(`resources.products.name`, {*/}
                {/*        smart_count: 2,*/}
                {/*    })}*/}
                {/*    leftIcon={<products.icon />}*/}
                {/*    dense={dense}*/}
                {/*/>*/}
                <MenuItemLink
                    to="/categories"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.categories.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<categories.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/articles"
                    state={{ _scrollToTop: true }}
                    primaryText="Articles"
                    leftIcon={<products.icon />}
                    dense={dense}
                />
            {/*</SubMenu>*/}
            {/*<SubMenu*/}
            {/*    handleToggle={() => handleToggle('menuCustomers')}*/}
            {/*    isOpen={state.menuCustomers}*/}
            {/*    name="pos.menu.users"*/}
            {/*    icon={<visitors.icon />}*/}
            {/*    dense={dense}*/}
            {/*>*/}
                <MenuItemLink
                    to="/customers"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.users.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<visitors.icon />}
                    dense={dense}
                />
            <MenuItemLink
                to="/blocked-users"
                state={{ _scrollToTop: true }}
                primaryText="Blocked users"
                leftIcon={<blockedUsers.icon />}
                dense={dense}
            />
            <MenuItemLink
                to="/custom-articles"
                state={{ _scrollToTop: true }}
                primaryText="Custom articles"
                leftIcon={<customArticles.icon />}
                dense={dense}
            />
            <MenuItemLink
                to="/reports"
                state={{ _scrollToTop: true }}
                primaryText="Reports"
                leftIcon={<reports.icon />}
                dense={dense}
            />
            <MenuItemLink
                to="/private-chats"
                state={{ _scrollToTop: true }}
                primaryText="Private chats"
                leftIcon={<privateChats.icon />}
                dense={dense}
            />
        </Box>
    );
};

export default Menu;
