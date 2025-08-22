import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "@emotion/styled";

export default function PageSkeleton() {
  return (
    <SkeletonContainer>
      {/* Top header / title */}
      <Skeleton height={24} width={200} style={{ marginBottom: "12px" }} />

      {/* Small content blocks */}
      <Skeleton height={16} style={{ marginBottom: "8px" }} />
      <Skeleton height={16} style={{ marginBottom: "8px" }} />
      <Skeleton height={16} style={{ marginBottom: "8px" }} />

      {/* Optional larger block */}
      <Skeleton height={120} style={{ marginTop: "20px" }} />
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  background-color: #f9fafb;
  padding: 16px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;
