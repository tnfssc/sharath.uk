import { useSelect, useValue } from 'react-cosmos/client';

import { useSelectTheme } from '@/components/__DEV__/useSelectTheme';

import { Button, type ButtonProps } from '.';

export default function ButtonFixture() {
  useSelectTheme();
  const [variant] = useSelect<Exclude<ButtonProps['variant'], null | undefined>>('Variant', {
    options: ['default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
    defaultValue: 'default',
  });

  const [children] = useValue<string>('Children', { defaultValue: 'Button' });

  return <Button variant={variant}>{children}</Button>;
}
