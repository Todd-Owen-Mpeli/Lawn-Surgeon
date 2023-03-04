import {gql} from "@apollo/client";
import {client} from "../lib/apollo";

// Components
import MetaTag from "../components/Meta/MetaTag";

export default function Home({seo, homePageContent}: any) {
	return (
		<>
			{/* <!--===== META TAG =====--> */}
			<MetaTag title={`Lawn Surgeon`} seo={seo} />

			<main>
				<h1 className="max-w-sm mx-auto md:max-w-xl text-[2rem] sm:text-5xl md:text-8xl font-bold leading-normal sm:leading-[4.5rem] text-center text-white mb-6">
					{homePageContent?.title}
				</h1>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const getHomePageContent: any = gql`
		{
			mainContent: pages(where: {id: 9, status: PUBLISH}) {
				edges {
					node {
						seo {
							canonical
							cornerstone
							focuskw
							fullHead
							metaDesc
							metaKeywords
							metaRobotsNofollow
							metaRobotsNoindex
							opengraphAuthor
							opengraphDescription
							opengraphImage {
								mediaItemUrl
							}
							opengraphModifiedTime
							opengraphPublishedTime
							opengraphPublisher
							opengraphSiteName
							opengraphTitle
							opengraphType
							opengraphUrl
							readingTime
							title
							twitterDescription
							twitterTitle
							twitterImage {
								mediaItemUrl
							}
						}
						homePage {
							title
						}
					}
				}
			}
		}
	`;

	const response: any = await client.query({
		query: getHomePageContent,
	});

	return {
		props: {
			seo: response?.data?.mainContent?.edges[0]?.node?.seo,
			homePageContent: response.data?.mainContent?.edges[0]?.node?.homePage,
		},
		revalidate: 60,
	};
}
