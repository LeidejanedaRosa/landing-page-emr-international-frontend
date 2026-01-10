import { type TabData } from '../../../data/whyItMattersData'
import { AccessibleButton } from '../../ui/Accessibility'

interface TabSwitcherProps {
  tabs: TabData[]
  activeTabId: string
  // eslint-disable-next-line no-unused-vars
  onTabChange: (id: string) => void
  tabListId: string
}

export function TabSwitcher({
  tabs,
  activeTabId,
  onTabChange,
  tabListId,
}: TabSwitcherProps) {
  return (
    <nav
      className='flex justify-center mb-6'
      aria-label='Selecionar tipo de ambiente de emergência'
    >
      <div
        role='tablist'
        id={tabListId}
        aria-label='Categorias de estatísticas de emergência'
        className='p-1.5 rounded-full bg-zinc-100 border border-zinc-200 flex relative w-full h-[50px] max-w-xl shadow-inner'
      >
        {tabs.map(tab => {
          const isActive = activeTabId === tab.id
          const activeStyles =
            tab.id === 'tactical'
              ? 'bg-red-600 text-white shadow-md shadow-red-900/20'
              : 'bg-warning-600 text-white whitespace-nowrap shadow-md shadow-warning-900/20'

          return (
            <AccessibleButton
              key={tab.id}
              id={`${tab.id}-tab`}
              onClick={() => onTabChange(tab.id)}
              variant={isActive ? 'primary' : 'ghost'}
              className={`flex-1 py-2 px-6 !rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                isActive
                  ? activeStyles
                  : 'text-zinc-600 hover:text-zinc-800 hover:bg-zinc-200/50 text-nowrap'
              }`}
              role='tab'
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </AccessibleButton>
          )
        })}
      </div>
    </nav>
  )
}
