/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-02-04 09:36:11
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-03-26 16:51:40
 * @FilePath: \项目\AIplatform\ai-platform\src\locale\en-US.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeHome from '@/views/home/locale/en-US';
import localeAlgorithm from '@/views/aispace/algorithm/locale/en-US';
import localeScene from '@/views/aispace/scene/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localeMonitor from '@/views/dashboard/monitor/locale/en-US';

import localeSearchTable from '@/views/list/search-table/locale/en-US';
import localeCardList from '@/views/list/card/locale/en-US';

import localeStepForm from '@/views/form/step/locale/en-US';
import localeGroupForm from '@/views/form/group/locale/en-US';

import localeBasicProfile from '@/views/profile/basic/locale/en-US';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/en-US';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/en-US';

import localeSuccess from '@/views/result/success/locale/en-US';
import localeError from '@/views/result/error/locale/en-US';

import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';

import localeUserInfo from '@/views/user/info/locale/en-US';
import localeUserSetting from '@/views/user/setting/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.home': 'Home',
  'menu.aispace': 'AISpace',
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeHome,
  ...localeAlgorithm,
  ...localeScene,
  ...localeWorkplace,

  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
};
