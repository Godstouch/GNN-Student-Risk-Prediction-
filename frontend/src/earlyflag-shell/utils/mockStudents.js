// Placeholder data standing in for the Flask/ONNX API response.
// Once Person C wires up the real endpoint (Week 3), this file is deleted
// and DashboardPage/usePredictions fetch real data instead — the shape
// here should match whatever JSON contract your team agrees on with the
// backend (id, name, riskTier, riskScore at minimum).
export const mockStudents = [
  { id: 'stu-001', name: 'Ama Serwaa', riskTier: 'high', riskScore: 0.87 },
  { id: 'stu-002', name: 'Kwame Boateng', riskTier: 'medium', riskScore: 0.54 },
  { id: 'stu-003', name: 'Efua Mensah', riskTier: 'low', riskScore: 0.18 },
  { id: 'stu-004', name: 'Yaw Owusu', riskTier: 'high', riskScore: 0.79 },
  { id: 'stu-005', name: 'Adjoa Darko', riskTier: 'medium', riskScore: 0.46 },
];
