import * as pagesComponents from './pagesComponents';

// 路由与页面对映表
const MenuConponentsTable = {
  '/module1/about1': pagesComponents.M1About1, // 模块1 - 关于我们1
  '/module1/about2': pagesComponents.M1About2, // 模块1 - 关于我们2
  '/module2/about1': pagesComponents.M2About1, // 模块2 - 关于我们1
  '/module2/about2': pagesComponents.M2About2, // 模块2 - 关于我们2
  'collection-demo': pagesComponents.M1About2,
  '/collection/cases/list': pagesComponents.M1About1, // 催收管理 - 案件查询
  '/collection/cases/assign': pagesComponents.M1About1, // 催收管理 - 案件分配
  '/collection/cases/contracts': pagesComponents.M1About1, // 催收管理 - 合同查询
  '/2/repayOrd/repayOrdCollect/list': pagesComponents.M1About1, // 回款管理 - 回款汇总查询
  '/2/repayOrd/repayOrdDetail/list': pagesComponents.M1About1, // 回款管理 - 回款明细查询
  '/3/arb/list': pagesComponents.M1About1, // 仲裁管理 - 我的仲裁
  '/3/arb/checkList': pagesComponents.M1About1, // 仲裁管理 - 仲裁审批
  '/5/cases/assign?checkSts=1': pagesComponents.M1About1, // 审查专用 - 案件查询
  '/5/repayOrd/repayOrdCollect/list?checkSts=1': pagesComponents.M1About1, // 审查专用 - 回款汇总查询
  '/5/repayOrd/repayOrdDetail/list?checkSts=1': pagesComponents.M1About1, // 审查专用 - 回款明细查询
  '/6/reports/overDueReports/list': pagesComponents.M1About1, // 报表 - 逾期日报
  '/6/moor/callDetail/list': pagesComponents.M1About1, // 报表 - 呼叫明细
  '/6/moor/agentState/list': pagesComponents.M1About1, // 报表 - 坐席监控
  '/6/reports/collectRate/list': pagesComponents.M1About1, // 报表 - 催收回收率
  '/7/embed/cardAgrInfo/list': pagesComponents.M1About1, // 产品用户管理 - 用户绑卡信息
  '/8/embed/userRepayOrd/list?repayOrdTyp=UR': pagesComponents.M1About1, // 账单管理 - 用户主动还款
  '/8/embed/userRepayOrd/list?repayOrdTyp=SR': pagesComponents.M1About1, // 账单管理 - 系统代扣还款
  '/9/overdueSmsCode/list': pagesComponents.M1About1, // 埋点短信 - 埋点短信列表
  '/10/divide/list': pagesComponents.M1About1, // 案件规则 - 规则列表
  '/11/call/record/list': pagesComponents.M1About1, // 催收录音 - 催收录音列表
  '/12/system/user/list': pagesComponents.M1About1, // 系统管理 - 系统用户管理
  '/12/system/role/list': pagesComponents.M1About1, // 系统管理 - 系统角色管理
  '/12/system/menu/list': pagesComponents.M1About1, // 系统管理 - 菜单管理
  '/12/system/collectionRole/list': pagesComponents.M1About1, // 系统管理 - 催收角色管理
  '/12/system/collection/organization/list': pagesComponents.M1About1, // 系统管理 - 催收人员管理
  '/12/system/seatRelation/list': pagesComponents.M1About1, // 系统管理 - 坐席关系维护
  '/12/system/dictionary/list': pagesComponents.M1About1, // 系统管理 - 数据字典管理
  '/13/letters/casesList': pagesComponents.M1About1, // 催收函管理 - 催收函我的案件
};

export default MenuConponentsTable;
