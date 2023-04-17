import { Podcast } from '../domain/entities/Podcast/podcast';

export class PodcastDTO {
    static fromHttp(json: any): Podcast {
        return new Podcast(
            json.id.attributes["im:id"],
            json["im:name"].label,
            json["im:artist"].label,
            json["im:image"][2].label,
            json.summary.label
        );
    }

    static toStorage(podcast: Podcast): any {
        return {
            id: podcast.id,
            title: podcast.title,
            autor: podcast.autor,
            imageSource: podcast.imageSource,
            description: podcast.description,
        }
    }

    static fromStorage(json: any): Podcast {
        return new Podcast(
            json.id, json.title, json.autor, json.imageSource, json.description
        )
    }
}