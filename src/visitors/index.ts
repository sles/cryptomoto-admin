import VisitorIcon from '@mui/icons-material/People';

import VisitorList from './VisitorList';
import VisitorCreate from './VisitorCreate';
import VisitorEdit from './VisitorEdit';
import CustomerShow from "../visitors/VisitorShow";

const resource = {
    list: VisitorList,
    create: VisitorCreate,
    edit: VisitorEdit,
    show: CustomerShow,
    icon: VisitorIcon,
};

export default resource;
