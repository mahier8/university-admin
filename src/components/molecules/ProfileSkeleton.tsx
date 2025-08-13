import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileSkeleton() {
  return (
    <div style={{ padding: 20 }}>
      {/* Page Title */}
      <Skeleton height={32} width={200} style={{ marginBottom: 20 }} />

      {/* Role-based select (if any) */}
      <Skeleton height={40} width={250} style={{ marginBottom: 20 }} />

      {/* Profile Card */}
      <div style={{ background: "white", padding: 20, borderRadius: 8, marginBottom: 20 }}>
        <Skeleton height={20} width={150} style={{ marginBottom: 10 }} />
        <Skeleton height={20} width={250} style={{ marginBottom: 10 }} />
        <Skeleton height={20} width={100} />
      </div>

      {/* Sections */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            background: "white",
            padding: 20,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <Skeleton height={24} width={180} style={{ marginBottom: 10 }} />
          <Skeleton count={3} height={16} style={{ marginBottom: 8 }} />
        </div>
      ))}
    </div>
  );
}
