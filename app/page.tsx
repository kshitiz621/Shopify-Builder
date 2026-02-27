import { LeftPanel } from '@/components/builder/LeftPanel';
import { Canvas } from '@/components/builder/Canvas';
import { RightPanel } from '@/components/builder/RightPanel';

export default function BuilderPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gray-50 font-sans text-gray-900">
      <LeftPanel />
      <Canvas />
      <RightPanel />
    </main>
  );
}
