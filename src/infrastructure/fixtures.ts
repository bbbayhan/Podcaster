export const podcastListFixture = {
    feed: {
        entry: [
            {
                id: { attributes: { 'im:id': '1' } },
                'im:name': { label: 'Podcast 1' },
                'im:artist': { label: 'Author 1' },
                'im:image': [
                    { label: 'imageSource1-1' },
                    { label: 'imageSource1-2' },
                    { label: 'imageSource1-3' },
                ],
                summary: { label: 'Description 1' },
            },

        ],
    },
};

export const podcastListJSONFixture = [
    {
        id: '1',
        title: 'Podcast 1',
        autor: 'Author 1',
        imageSource: 'imageSource1',
        description: 'Description 1',
    },
]

export const podcastDetailFixture = {
    resultCount: 1,
    results:
        [
            {
                trackId: 'track1',
                trackName: 'trackname',
                releaseDate: '01/02/2023',
                trackTimeMillis: '78738',
                description: 'trackDescription',
                url: 'track@track.com'
            },

        ],
}

export const podcastDetailJSONFixture = [
    {
        id: '1',
        title: 'Podcast 1',
        date: '01/02/2024',
        duration: '65456',
        description: 'Description 1',
        audio: 'audio1',
    },
]