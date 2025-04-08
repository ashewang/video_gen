import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const SceneImageWithRollingText: React.FC<{
  backgroundImage: string;
  text: string;
}> = ({ backgroundImage, text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, height } = useVideoConfig();

  const translateY = interpolate(frame, [0, durationInFrames], [height, -height], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Img src={backgroundImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{
          color: 'white',
          fontSize: '60px',
          textAlign: 'center',
          transform: `translateY(${translateY}px)`,
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}>
          {text}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
