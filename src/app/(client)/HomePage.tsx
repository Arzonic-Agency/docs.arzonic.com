import PageContent from "@/components/client/home/PageContent";
import { fetchSectionsBySlugs } from "@/lib/client/actions";

const HomePage = async () => {
  // Hent alle topics der bruges i PageContent
  const getStartedData = await fetchSectionsBySlugs("get-started", []);
  const newsPostData = await fetchSectionsBySlugs("news-post", []);
  const supportContactData = await fetchSectionsBySlugs("support-contact", []);
  const userManagementData = await fetchSectionsBySlugs("user-management", []);

  // Send alle topics til PageContent
  const topicsData = {
    "get-started": getStartedData,
    "news-post": newsPostData,
    "support-contact": supportContactData,
    "user-management": userManagementData,
  };

  return (
    <div className="p-3 md:p-7">
      <PageContent topicsData={topicsData} />
    </div>
  );
};

export default HomePage;
