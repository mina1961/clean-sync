

export default function VillaCard({ villa }) {
    return (
        <article className="overflow-hidden rounded-2xl bg-white shadow-md">
            <img
                src={villa.image_url}
                alt={villa.name}
                className="h-56 w-full object-cover"
            />

            <div className="p-6">
                <h2 className="text-2xl font-semibold">
                    {villa.name}
                </h2>

                <p className="mt-2 text-gray-500">
                    📍 {villa.location}
                </p>

                <p className="mt-4 text-gray-700">
                    {villa.description || "Description coming soon."}
                </p>

                <p className="mt-4 text-sm text-gray-500">
                    {villa.bedrooms} bedrooms · {villa.bathrooms} bathrooms
                </p>
            </div>
        </article>
    );
}
