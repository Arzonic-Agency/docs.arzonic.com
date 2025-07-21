"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

const docSections = [
	{
		category: "getting_started",
		items: ["what_is_dashboard", "login_access", "roles_permissions"],
	},
	{
		category: "overview_navigation",
		items: ["frontpage", "menu_sections", "change_language_theme"],
	},
	{
		category: "news_posts",
		items: ["create_post", "upload_media", "edit_delete", "social_publish"],
	},
	{
		category: "course_event",
		items: ["create_edit_course", "registration_management", "calendar_display"],
	},
	{
		category: "user_management",
		items: ["add_edit_user", "assign_roles", "deactivate_user"],
	},
	{
		category: "settings_integrations",
		items: ["configure_social", "webhook_integrations", "upload_branding"],
	},
	{
		category: "faq",
		items: ["cant_login", "cant_see_pages", "change_content"],
	},
	{
		category: "support_contact",
		items: ["get_help", "bug_feedback", "customer_service"],
	},
];

const Sidebar = () => {
	const { t } = useTranslation();

	return (
		<div className="p-4 w-full">
			<ul className="menu w-72">
				{docSections.map((section) => (
					<li key={section.category}>
						<span>{t(`Sidebar.${section.category}`)}</span>
						<ul>
							{section.items.map((item) => (
								<li key={item}>
									<Link href={`#${item.replace(/_/g, "-")}`}>
										{t(`Sidebar.${item}`)}
									</Link>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;