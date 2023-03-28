import FeatureCard from "../../components/featureCard/FeatureCard";
import MainLayout from "../../layouts/mainLayout/MainLayout";
type Props = {};

export default function Homepage({}: Props) {
    return (
        <MainLayout>
            <h1>Homepage</h1>
            <h2>Features</h2>
            <div>
                <FeatureCard name="Shopping list" />
            </div>
        </MainLayout>
    );
}
