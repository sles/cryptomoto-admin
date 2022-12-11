import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {EditGuesser, ListGuesser, ShowGuesser} from "react-admin";
import PrivateChatList from "../private-chats/PrivateChatList";
import PrivateChatEdit from "../private-chats/PrivateChatEdit";



const resource = {
    list: PrivateChatList,
    edit: PrivateChatEdit,
    show: ShowGuesser,
    icon: ChatBubbleIcon,
};

export default resource;