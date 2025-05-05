import AuthButton from '@/ui/auth-button';
import HeaderClient from '@/ui/header-client';

export default async function Header() {
    
  return (
    <HeaderClient>
      <AuthButton />
    </HeaderClient>
  );
}
