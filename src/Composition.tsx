import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { SceneImageWithText } from './SceneImageWithText';
import { SceneImageWithRollingText } from './SceneImageWithRollingText';
import { SceneImageWithAura } from './SceneImageWithAura';
import { Audio } from 'remotion';


export const SceneRenderer: React.FC<{ scenes: any[] }> = ({ scenes }) => {
  let currentFrame = 0;
  const fps = 30;

  return (
    <AbsoluteFill>
      <Audio src={staticFile('music.mp3')} volume={0.5} />
      {scenes.map((scene, index) => {
        const durationInFrames = Math.floor(scene.duration * fps);

        const SceneComponent = (() => {
          switch (scene.type) {
            case 'image-with-text':
              return SceneImageWithText;
            case 'image-with-rolling-text':
              return SceneImageWithRollingText;
            case 'image-with-aura':
              return SceneImageWithAura;
            default:
              console.warn(`Unknown scene type: ${scene.type}, defaulting to image-with-text`);
              return SceneImageWithText;
          }
        })();

        const element = (
          <Sequence
            key={index}
            from={currentFrame}
            durationInFrames={durationInFrames}
          >
            <SceneComponent {...scene} />
          </Sequence>
        );

        currentFrame += durationInFrames;

        return element;
      })}
    </AbsoluteFill>
  );
};
