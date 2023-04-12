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