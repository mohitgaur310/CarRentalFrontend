import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { classNames } from '../../utils';

const Tabs = ({ tabs = [], className = '' }) => {
  return (
    <TabGroup className={className}>
      <TabList className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            className={({ selected }) =>
              classNames(
                'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus:outline-none',
                selected
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-4">
        {tabs.map((tab) => (
          <TabPanel key={tab.key}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tabs;
