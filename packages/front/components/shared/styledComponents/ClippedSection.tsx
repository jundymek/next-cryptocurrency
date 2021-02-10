import styled from 'styled-components';

interface ClippedSectionProps {
  bgImage?: string;
}

const DIAGONAL = 80;

export const ClippedSection = styled.section<ClippedSectionProps>`
  @media (min-width: 640px) {
    z-index: 0;
    position: relative;
    &::before {
      --diagonal-padding: 80px;
      background-color: inherit;
      content: '';
      background-image: ${(props) => (props.bgImage ? `url('${props.bgImage}')` : 'none')};
      background-size: ${(props) => (props.bgImage ? 'cover' : 'none')};
      background-repeat: ${(props) => (props.bgImage ? 'no-repeat' : 'none')};
      background-position: ${(props) => (props.bgImage ? 'center' : 'none')};
      position: absolute;
      top: calc(-1 * ${DIAGONAL}px);
      left: 0;
      width: 100%;
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
