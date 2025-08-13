import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "@emotion/styled";

export default function DashboardSkeleton() {
  return (
    <SkeletonContainer>
      {/* Welcome Message */}
      <Skeleton height={28} width={300} style={{ marginBottom: "20px" }} />

      {/* Announcements */}
      <Skeleton height={150} style={{ marginBottom: "30px" }} />

      {/* Chart / Table placeholders */}
      <Skeleton height={250} style={{ marginBottom: "30px" }} />
      <Skeleton height={250} />
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  background-color: #f5f6fa;
  padding: 20px;
  height: 100%;
`;
