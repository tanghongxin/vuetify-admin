export const items = [
  {
    text: '项目管理',
    icon: 'apps',
    to: '/project',
    model: false,
    children: [
      {
        text: '项目列表',
        to: '/project/list',
        model: false,
      },
    ],
  },
  {
    text: '门店管理',
    icon: 'store',
    to: '/shop',
    model: false,
    children: [
      {
        text: '门店列表',
        to: '/shop/list',
        model: false,
      },
    ],
  },
  {
    text: '员工管理',
    icon: 'face',
    to: '/employee',
    model: false,
    children: [
      {
        text: '门店列表',
        to: '/employee/list',
        model: false,
      },
    ],
  },
]

export const demo = [
  { icon: 'contacts', text: 'Contacts' },
  { icon: 'history', text: 'Frequently contacted' },
  { icon: 'content_copy', text: 'Duplicates' },
  {
    icon: 'keyboard_arrow_up',
    'icon-alt': 'keyboard_arrow_down',
    text: 'Labels',
    model: true,
    children: [
      { icon: 'add', text: 'Create label' },
    ],
  },
  {
    icon: 'keyboard_arrow_up',
    'icon-alt': 'keyboard_arrow_down',
    text: 'More',
    model: false,
    children: [
      { text: 'Import' },
      { text: 'Export' },
      { text: 'Print' },
      { text: 'Undo changes' },
      { text: 'Other contacts' },
    ],
  },
  { icon: 'settings', text: 'Settings' },
  { icon: 'chat_bubble', text: 'Send feedback' },
  { icon: 'help', text: 'Help' },
  { icon: 'phonelink', text: 'App downloads' },
  { icon: 'keyboard', text: 'Go to the old version' },
]