import FeatureCard from "../../components/featureCard/FeatureCard";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import PageLayout from "../../layouts/pageLayout/PageLayout";
type Props = {};

export default function Homepage({}: Props) {
    return (
        <PageLayout>
            <h1>Homepage</h1>
            <h2>Features</h2>
            <div>
                <FeatureCard name="Shopping list" />
            </div>
        </PageLayout>
    );
}
