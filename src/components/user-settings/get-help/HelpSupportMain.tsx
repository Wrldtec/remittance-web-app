import { DialogSettingsIcons } from "@/components/icons/Icons";
import React from "react";

type SettingsLists = {
  Icon: React.FC;
  title: string;
  content: string;
  id: string;
};

const settingsLists: SettingsLists[] = [
  {
    Icon: DialogSettingsIcons.Help,
    title: "Frequently Asked Questions",
    id: "faqs",
    content: "Browse frequently asked questions ",
  },
  {
    Icon: DialogSettingsIcons.Articles,
    title: "Articles and blog",
    id: "articles",
    content: "Browse our support article and blog",
  },
  {
    Icon: DialogSettingsIcons.ContactSupport,
    title: "Contact our team",
    id: "contact-us",
    content: "Get in a call with our support team",
  },
];

const HelpSupportMain = ({
  handleNext,
}: {
  handleNext: (args: string) => void;
}) => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
              Help and support
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {settingsLists.map(({ Icon, title, id, content }) => (
              <article
                key={id}
                id={id}
                onClick={() => handleNext(id)}
                className="border-[#E0E0E0] border bg-[#F3F3FB] px-3 py-4 rounded-[4px] flex items-center cursor-pointer"
              >
                <div className="flex gap-5 items-center">
                  <div className="border border-[#0D0D4B29] size-[38px] bg-[#EBEBF9] rounded-[4px] flex items-center justify-center">
                    <Icon />
                  </div>

                  <div className="flex flex-col gap-4">
                    <h6 className="font-general-sans font-medium leading-5 tracking-[-1%] text-sm text-[#1b1b1b]">
                      {title}
                    </h6>
                    <p className="font-roboto text-[#696969] text-sm font-normal tracking-[-1%] leading-[18px]">
                      {content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportMain;
