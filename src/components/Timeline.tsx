import { useTheme } from "next-themes";

const timelineClasses = {
  icon: "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-violet-900 ring-0 ring-violet-200 sm:ring-8",
};
export default function Timeline({ cardClasses }) {
  return (
    <ol className="items-start sm:flex">
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-start">
          <div className={timelineClasses.icon}>
            <svg
              aria-hidden="true"
              className="h-3 w-3 text-white "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex"></div>
        </div>
        <TimelineCard
          cardClasses={cardClasses}
          title={"Blood Test"}
          date={"January 5, 2022"}
          description={
            "Blood test was performed and the presence of the parasite was detected indicating patient having malaria."
          }
        />
      </li>
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className={timelineClasses.icon}>
            <svg
              aria-hidden="true"
              className="h-3 w-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex"></div>
        </div>
        <TimelineCard
          cardClasses={cardClasses}
          title={"Drugs administered"}
          date={"January 8, 2022"}
          description={
            "Antimalarial drugs were administered to the patient and the patient was closely monitored for any side effects."
          }
        />
      </li>
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className={timelineClasses.icon}>
            <svg
              aria-hidden="true"
              className="h-3 w-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex"></div>
        </div>
        <TimelineCard
          cardClasses={cardClasses}
          title={"Final tests"}
          date={"January 31, 2022"}
          description={
            "Patient was tested to ensure that the parasites have been eliminated from their body."
          }
        />
      </li>
    </ol>
  );
}

function TimelineCard({ cardClasses, title, date, description }) {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? cardClasses.dark : cardClasses.light
      } + ${cardClasses.card}`}
    >
      <div className="flex flex-col justify-start p-6">
        <h5 className="mb-2 text-xl font-medium ">{title}</h5>
        <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {date}
        </time>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
