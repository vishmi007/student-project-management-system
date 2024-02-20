const ROLES_LIST = {
  lecturer: { roleStrVal: "lecturer", roleVal: 4356 },
  supervisor: { roleStrVal: "supervisor", roleVal: 8080 },
  evaluator: { roleStrVal: "evaluator", roleVal: 7787 },
  student: { roleStrVal: "student", roleVal: 2990 },
};

export function getUserRoleBaseRoute(roleValue) {
  const defaultRoute = "login";
  const role = Object.values(ROLES_LIST).find(
    (role) => role.roleVal === roleValue
  );
  return role ? role.roleStrVal : defaultRoute;
}

export default ROLES_LIST;
