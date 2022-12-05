import CategoryIcon from '@mui/icons-material/Bookmark';

import CategoryList from './CategoryList';
import CategoryEdit from './CategoryEdit';
import {ShowGuesser} from "react-admin";

export default {
    list: CategoryList,
    edit: CategoryEdit,
    icon: CategoryIcon,
    show: ShowGuesser,
};
