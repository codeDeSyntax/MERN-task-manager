import { useState, useEffect, useContext } from "react";
import { Header } from "./Header";
import { TaskCard } from "./TaskCard";
import { Tabs } from "./Tabs";
import { Sidebar } from "./SideBar";
import { StateProvider } from "./GlobalState";
import NewTask from "./CreateForm";
import axios from "axios";
import { GlobState } from "./GlobalState";
import Loader from "./Loader";

const TaskManager = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("1");
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { tasks, setTasks } = useContext(GlobState);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      setCollapsed(isMobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { key: "1", icon: "✅", label: "All Tasks" },
    { key: "2", icon: "⏳", label: "In Progress" },
    { key: "3", icon: "❗", label: "Important" },
  ];

  const tabs = [
    { key: "1", label: "All Tasks" },
    { key: "2", label: "In Progress" },
    { key: "3", label: "Important" },
  ];
  //get all tasks
  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/tasks");
        // console.log(res.data);
        setTasks(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [setTasks]);

  return (
    <StateProvider>
      <div className="flex min-h-screen bg-background gap-2">
        {!mobileView && (
          <Sidebar
            collapsed={collapsed}
            menuItems={menuItems}
            onSignOut={() => console.log("Sign out")}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden rounded-s-3xl bg-text">
          <Header
            collapsed={collapsed}
            toggleSidebar={toggleSidebar}
            showUserIcon={mobileView}
          />
          <main className="flex- overflow-x-hidden overflow-y-scroll ">
            {loading ? (
              <Loader />
            ) : (
              <div className="container mx-auto px-6 py-3 bg-opacity-60 backdrop-blur-lg">
                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {activeTab === "1" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                      <TaskCard key={task._id} task={task} />
                    ))}
                  </div>
                )}
                {activeTab === "2" && (
                  <p>In Progress tasks will be displayed here.</p>
                )}
                {activeTab === "3" && (
                  <p>Important tasks will be displayed here.</p>
                )}
              </div>
            )}
          </main>
        </div>

        <NewTask
          setFormOpen={setFormOpen}
          formOpen={formOpen}
          setLoading={setLoading}
        />
      </div>
    </StateProvider>
  );
};

export default TaskManager;
