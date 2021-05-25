import got from 'got';
import metaScraperModule from 'metascraper';
import metaScraperTitlePlugin from 'metascraper-title';

const metaScraper = metaScraperModule([metaScraperTitlePlugin()]);

export async function scrapeTitleFromUrl(url: string) {

	let metadata;

	try {
		const { body: html } = await got(url);
		metadata = await metaScraper({ html, url });
	} catch (error) {
		console.log(error);
	}

	return { title: metadata?.title || url };
}