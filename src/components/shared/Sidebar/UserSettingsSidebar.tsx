import { UserSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logOut } from "@/features/auth/auth.slice";
import { showSuccess } from "@/utils/toaster";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

interface UserSettingsSidebarProps {
  tabs: Tabs[];
  activeTab: string;
  handleTabChange: (args: string) => void;
}

type Tabs = {
  Icon: (props: { color?: string }) => ReactNode;
  title: string;
  value: string;
};
const UserSettingsSidebar = ({
  tabs,
  activeTab,
  handleTabChange,
}: UserSettingsSidebarProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    showSuccess("Success", "You have successfully logged out.");
  };

  return (
    <TabsList
      className={`py-6 rounded-none h-full shadow-md rounded-bl-[8px] ml-0 bg-white flex flex-col items-start justify-between max-w-[14.5rem] w-full `}
    >
      <div className="flex flex-col pl-3 pr-[18px] w-full">
        {tabs.map(({ Icon, title, value }) => (
          <TabsTrigger
            className="h-10 hover:bg-[#F5F8FD] data-[state=active]:shadow-none px-1.5 py-2 justify-start rounded-[8px] font-inter font-[475] text-sm leading-5 tracking-[-0.05px] text-[#696969] data-[state=active]:text-[#3333C1] data-[state=active]:bg-[#F5F8FD]"
            value={value}
            key={value}
            onClick={() => handleTabChange(value)}
          >
            <Icon color={`${value === activeTab ? "#3333C1" : ""}`} />

            {title}
          </TabsTrigger>
        ))}
      </div>
      <div className="px-6">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`cursor-pointer border border-transparent hover:bg-transparent hover:border-[#D32F2F] transition-colors ease-linear duration-300 flex items-center gap-2 !py-2 !px-1.5 h-10 rounded-[8px]`}
        >
          <UserSettingsIcons.Logout />
          <p className="text-[#D32F2F] font-inter font-[475] text-sm leading-5 ">
            Log out
          </p>
        </Button>
      </div>
    </TabsList>
  );
};

export default UserSettingsSidebar;
