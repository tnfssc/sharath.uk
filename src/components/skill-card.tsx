import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

export interface SkillCardProps {
  title: React.ReactNode;
  image?: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
  href: string;
}

export default function SkillCard({ children, description, image, title, href }: SkillCardProps) {
  return (
    <CardContainer>
      <CardBody
        className="relative h-auto max-w-xs w-auto border border-foreground/[0.2] rounded-xl bg-background bg-opacity-50 p-6 text-left"
        onClick={() => window.open(href, '_blank', 'noopener noreferrer')}
      >
        <CardItem translateZ="50" className="text-xl text-foreground/[0.9] font-bold">
          {title}
        </CardItem>
        {image && (
          <CardItem as="div" translateZ="40">
            {image}
          </CardItem>
        )}
        <CardItem as="p" translateZ="60" className="mt-2 max-w-xs text-sm text-foreground/[0.7]">
          {description}
        </CardItem>
        {children && (
          <div className="mt-4">
            <CardItem translateZ="20">{children}</CardItem>
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
}
