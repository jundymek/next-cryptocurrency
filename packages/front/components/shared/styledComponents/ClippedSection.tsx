import styled from 'styled-components';

interface ClippedSectionProps {
  bgImage?: string;
  windowWidth?: number;
}

const DIAGONAL = 80;

export const ClippedSection = styled.section<ClippedSectionProps>`
  position: relative;
  &::before {
    background-color: inherit;
    content: '';
    background-image: ${(props) => (props.bgImage ? `url('${props.bgImage}')` : 'none')};
    background-size: ${(props) => (props.bgImage ? 'cover' : 'none')};
    background-repeat: ${(props) => (props.bgImage ? 'no-repeat' : 'none')};
    background-position: ${(props) => (props.bgImage ? 'center' : 'none')};
    background-blend-mode: soft-light;
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    width: 100%;
    @media (min-width: 640px) {
      top: calc(-1 * ${DIAGONAL}px);
      height: calc(100% + (${DIAGONAL}px * 2));
      clip-path: polygon(0% ${DIAGONAL}px, 100% 0%, 100% calc(100% - ${DIAGONAL}px), 0% 100%);
      -webkit-clip-path: polygon(
        0% ${DIAGONAL}px,
        100% 0%,
        100% calc(100% - ${DIAGONAL}px),
        0% 100%
      );
    }
  }
`;
