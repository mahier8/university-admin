import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "@emotion/styled";

type Props = { rows?: number };

export default function CourseSkeleton({ rows = 6 }: Props) {
  return (
    <Card>
      <Header>
        <Skeleton width={180} height={24} />
      </Header>

      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th><Skeleton width={120} /></th>
              <th><Skeleton width={220} /></th>
              <th><Skeleton width={80} /></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </Card>
  );
}

const Card = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

const Header = styled.div`
  margin-bottom: 12px;
`;

const TableWrapper = styled.div`
  overflow: auto;
  max-height: 260px;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }

  th {
    background-color: #f5f6fa;
    color: #2c3e50;
  }
`;
