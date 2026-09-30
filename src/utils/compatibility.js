/**
 * Calculates the compatibility percentage between a student's profile and a career's profile.
 * Profiles have values from 1 to 5 in 5 dimensions: interests, skills, values, workPreferences, expectations.
 *
 * The distance is calculated using Euclidean distance or a simple absolute difference sum.
 * Since we want a percentage where 100% is perfect match:
 * Max possible distance in 1 dimension = 4 (5-1)
 * Max total absolute difference = 4 * 5 = 20
 * Compat = 100 - (diff / 20) * 100
 */
export function calculateCompatibility(studentScores, careerProfile) {
  if (!studentScores || !careerProfile) return 0;

  const dimensions = ['interests', 'skills', 'values', 'workPreferences', 'expectations'];
  let totalDifference = 0;

  dimensions.forEach(dim => {
    const studentVal = studentScores[dim] || 3; // Default to neutral if missing
    const careerVal = careerProfile[dim] || 3;
    totalDifference += Math.abs(studentVal - careerVal);
  });

  const maxDifference = 20; // 5 dimensions * max difference of 4
  const compatibilityPercentage = Math.round(100 - ((totalDifference / maxDifference) * 100));
  
  return Math.max(0, compatibilityPercentage); // Ensure it doesn't go below 0 just in case
}
