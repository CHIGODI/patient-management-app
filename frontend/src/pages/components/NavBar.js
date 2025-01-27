import { useSelector } from 'react-redux';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const NavBar = () => {
    const { user } = useSelector((state) => state.user);

    return (
        < div className = "h-[70px] border-b w-full flex justify-end items-center pr-[5%]" >
            <div className="h-[70%] flex flex-col justify-center px-4 w-[15%]">
                <h1 className="text-blue-600 text-sm font-bold">{user.email}</h1>
                <p className="text-xs">{user.username}</p>
            </div>
            <FontAwesomeIcon className='text-xs text-gray-600' icon={faArrowRightFromBracket} />
        </div >
    );
};
export default NavBar;