export type Role = 
  | 'super_admin' 
  | 'admin' 
  | 'manager' 
  | 'developer' 
  | 'marketing' 
  | 'support' 
  | 'client';

export const ADMIN_ROLES: Role[] = [
  'super_admin',
  'admin',
  'manager',
  'developer',
  'marketing',
  'support'
];

export function isAdminRole(role?: string): boolean {
  if (!role) return false;
  return ADMIN_ROLES.includes(role as Role);
}

export function hasPermission(
  userRole: string,
  requiredRole: 'super_admin' | 'admin' | 'manager' | 'developer' | 'marketing' | 'support' | 'client'
): boolean {
  if (userRole === 'super_admin') return true;
  if (userRole === requiredRole) return true;

  const hierarchy: Record<Role, number> = {
    super_admin: 100,
    admin: 90,
    manager: 70,
    developer: 50,
    marketing: 50,
    support: 50,
    client: 10,
  };

  const userLevel = hierarchy[userRole as Role] || 0;
  const requiredLevel = hierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}
