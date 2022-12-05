import VisitorIcon from '@mui/icons-material/People';

import VisitorList from './VisitorList';
import VisitorCreate from './VisitorCreate';
import VisitorEdit from './VisitorEdit';
import {ShowGuesser} from "react-admin";

const resource = {
    list: VisitorList,
    create: VisitorCreate,
    edit: VisitorEdit,
    show: ShowGuesser,
    icon: VisitorIcon,
};

export default resource;
