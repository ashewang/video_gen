import { Composition } from 'remotion';
import { SceneRenderer } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VideoComposition"
      component={SceneRenderer}
      durationInFrames={600}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        scenes: [],
      }}
    />
  );
};
