import FeatureCard from "../../components/featureCard/FeatureCard";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import PageLayout from "../../layouts/pageLayout/PageLayout";
import "./homepage.scss";
type Props = {};

export default function Homepage({}: Props) {
    return (
        <PageLayout>
            <div className="homepage">
                <h1 className="homepage__title">Features</h1>
                <div className="homepag__listse">
                    <FeatureCard name="Shopping list" />
                </div>
            </div>
        </PageLayout>
    );
}
