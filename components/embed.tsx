import {
  useRef,
  useState,
  useEffect,
  DetailedHTMLProps,
  IframeHTMLAttributes,
  memo,
} from 'react';

function useIframeWidth(maxWidth: number) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function calculateParentWidth() {
      const parentRect =
        iframeRef.current?.parentElement?.getBoundingClientRect();

      if (parentRect) {
        const { width: parentWidth } = parentRect;
        setWidth(Math.min(maxWidth, parentWidth - 20));
      }
    }

    calculateParentWidth();
    window.addEventListener('resize', calculateParentWidth);
    return () => {
      window.removeEventListener('resize', calculateParentWidth);
    };
  }, [maxWidth]);

  return [iframeRef, width] as const;
}

interface IframeEmbedProps
  extends DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  heightRatio?: number;
  maxWidth: number;
}

export function IframeEmbed({
  heightRatio,
  maxWidth,
  ...props
}: IframeEmbedProps) {
  const [ref, width] = useIframeWidth(maxWidth);
  return (
    <iframe
      ref={ref}
      width={`${width}`}
      height={heightRatio ? `${width * heightRatio}` : props.height}
      {...props}
    />
  );
}

function YouTubeEmbed({
  src,
  maxWidth = 560,
}: {
  src: string;
  maxWidth?: number;
}) {
  return (
    <IframeEmbed
      heightRatio={0.5625}
      maxWidth={maxWidth}
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

const YouTubeEmbedMemo = memo(YouTubeEmbed);
export { YouTubeEmbedMemo as YouTubeEmbed };
