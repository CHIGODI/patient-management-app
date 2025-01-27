import SideNav from "./components/SideNav";
import NavBar from "./components/NavBar";

const Dashboard = () => {
    return (
        <div className="min-h-screen">
            <NavBar />
            <SideNav />

            {/* Main Content */}
            <div className="fixed w-[80%] h-[calc(100%-70px)] right-0">
            </div>
        </div>
    );
};

export default Dashboard;
