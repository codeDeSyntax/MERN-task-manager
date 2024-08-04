import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TaskCard } from "./components/TaskCard";
import { Tabs } from "./components/Tabs";
import { Sidebar } from "./components/SideBar";
import { StateProvider } from "./components/GlobalState";
import NewTask from "./components/CreateForm";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("1");
  const [formOpen, setFormOpen] = useState(false);

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

  const tasks = [
    {
      id: 1,
      title: "Update Passwords",
      description: "Enhance online security across accounts",
      date: "14/10/2023",
      priority: "high",
    },
    {
      id: 2,
      title: "Watch Fireship Video",
      description: "Learn new web development techniques",
      date: "15/11/2023",
      priority: "medium",
    },
    {
      id: 3,
      title: "Weekly Review",
      description: "Assess progress and plan ahead",
      date: "27/08/2023",
      priority: "low",
    },
    {
      id: 4,
      title: "Dentist Appointment",
      description: "Regular check-up and cleaning",
      date: "25/10/2023",
      priority: "medium",
    },
    {
      id: 5,
      title: "Plant New Flowers",
      description: "Beautify the garden for spring",
      date: "25/10/2023",
      priority: "low",
    },
  ];

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
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-6 py-3 bg-opacity-60 backdrop-blur-lg">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {activeTab === "1" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
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
          </main>
        </div>
        
       
         <NewTask setFormOpen={setFormOpen} formOpen={formOpen}/>
       
      </div>
    </StateProvider>
  );
};

export default App;