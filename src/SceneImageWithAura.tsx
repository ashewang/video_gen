import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const SceneImageWithAura: React.FC<{
  backgroundImage: string;
  text?: string;
}> = ({ backgroundImage, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Aura animation cycle
  const cycleDuration = Math.floor(0.5 * fps); // 0.5 seconds cycle
  const cycleFrame = frame % cycleDuration;

  const auraOpacity = interpolate(
    cycleFrame,
    [0, cycleDuration / 2, cycleDuration],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const auraScale = interpolate(
    cycleFrame,
    [0, cycleDuration / 2, cycleDuration],
    [1, 1.2, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Text entrance animation (spring effect)
  const textSpring = spring({
    frame,
    fps,
    config: {
      damping: 200,
      mass: 0.5,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Background Image */}
      <Img
        src={backgroundImage}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Aura Effect */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            boxShadow: `0 0 60px 30px rgba(0, 128, 255, ${auraOpacity})`,
            transform: `scale(${auraScale})`,
          }}
        />
      </AbsoluteFill>

      {/* Text Overlay */}
      {text && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              transform: `scale(${textSpring})`,
              color: 'white',
              fontSize: '64px',
              textAlign: 'center',
              textShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
              padding: '0 40px',
              lineHeight: 1.3,
              fontWeight: 600,
            }}
          >
            {text}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
