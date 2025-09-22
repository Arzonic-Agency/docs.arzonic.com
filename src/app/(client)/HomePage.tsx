import PageContent from "@/components/client/home/PageContent";
import { fetchSectionsBySlugs } from "@/lib/client/actions";
import { debugDatabase } from "@/lib/client/debug";

const HomePage = async () => {
  // Debug - se hvad der er i databasen
  await debugDatabase();

  // Hent alle topics der bruges i PageContent
  const getStartedData = await fetchSectionsBySlugs("get-started", []);
  const newsPostData = await fetchSectionsBySlugs("news-post", []);
  const supportContactData = await fetchSectionsBySlugs("support-contact", []);
  const userManagementData = await fetchSectionsBySlugs("user-management", []);

  console.log("🏠 HomePage - All topic data:", {
    getStartedData,
    newsPostData,
    supportContactData,
    userManagementData,
  });

  // Send alle topics til PageContent
  const topicsData = {
    "get-started": getStartedData,
    "news-post": newsPostData,
    "support-contact": supportContactData,
    "user-management": userManagementData,
  };

  return (
    <div>
      <PageContent topicsData={topicsData} />
    </div>
  );
};

export default HomePage;
