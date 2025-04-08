import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const SceneImageWithText: React.FC<{
  backgroundImage: string;
  text: string;
  effect?: { type: string; sparkles?: boolean };
}> = ({ backgroundImage, text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, durationInFrames * 0.2], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Img src={backgroundImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity }} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{
          color: 'white',
          fontSize: '80px',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
        }}>
          {text}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
