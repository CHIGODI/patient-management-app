import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { persistor } from '../../redux/store';
import { useNavigate } from "react-router-dom";
import { clearUser } from '../../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(clearUser());
        persistor.purge();
        navigate('/')
    }

    return (
        < div className = "h-[70px] border-b w-full flex justify-end items-center pr-[5%]" >
            <div className="h-[70%] flex flex-col justify-center px-4 w-[15%]">
                <h1 className="text-blue-600 text-sm font-bold">{user.email}</h1>
                <p className="text-xs">{user.username}</p>
            </div>
            <FontAwesomeIcon onClick={handleLogout} className='text-xs text-gray-600' icon={faArrowRightFromBracket} />
        </div >
    );
};
export default NavBar;