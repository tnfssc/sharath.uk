import { createFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const settings = useSettings();
  return (
    <PageWrapper>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <Switch id="meteors-switch" checked={settings.meteors} onCheckedChange={settings.setMeteors} />
          <Label htmlFor="meteors-switch">Meteors</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="gradient-switch" checked={settings.gradient} onCheckedChange={settings.setGradient} />
          <Label htmlFor="gradient-switch">Background</Label>
        </div>
      </div>
    </PageWrapper>
  );
}
